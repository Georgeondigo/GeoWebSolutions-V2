import { prisma } from "@/lib/prisma";
import { sendInquiryNotification } from "@/lib/email";
import { inquirySchema } from "@/lib/validation";

export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return Response.json(
      {
        success: false,
        message: "Invalid JSON request body.",
      },
      { status: 400 },
    );
  }

  const result = inquirySchema.safeParse(body);

  if (!result.success) {
    return Response.json(
      {
        success: false,
        message: "Invalid inquiry data.",
        errors: result.error.flatten().fieldErrors,
      },
      { status: 400 },
    );
  }

  if (result.data.website) {
    return Response.json(
      {
        success: false,
        message: "Unable to process inquiry.",
      },
      { status: 400 },
    );
  }

  try {
    const inquiryData = { ...result.data };
    delete inquiryData.website;

    const inquiry = await prisma.inquiry.create({
      data: {
        ...inquiryData,
        notificationStatus: "PENDING",
      },
    });

    try {
      await sendInquiryNotification(inquiry);

      await prisma.inquiry.update({
        where: {
          id: inquiry.id,
        },
        data: {
          notificationStatus: "SENT",
          notificationSentAt: new Date(),
          notificationError: null,
        },
      });
    } catch (error) {
      console.error("Failed to send inquiry notification:", error);

      try {
        await prisma.inquiry.update({
          where: {
            id: inquiry.id,
          },
          data: {
            notificationStatus: "FAILED",
            notificationError: "Notification delivery failed.",
          },
        });
      } catch (updateError) {
        console.error(
          "Failed to update inquiry notification status:",
          updateError,
        );
      }
    }

    return Response.json(
      {
        success: true,
        message: "Inquiry received successfully.",
        inquiryId: inquiry.id,
      },
      { status: 201 },
    );
  } catch (error) {
    console.error("Failed to create inquiry:", error);

    return Response.json(
      {
        success: false,
        message: "Unable to process inquiry right now.",
      },
      { status: 500 },
    );
  }
}