import { prisma } from "@/lib/prisma";
import { inquirySchema } from "@/lib/validation";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const result = inquirySchema.safeParse(body);

    if (!result.success) {
      return Response.json(
        {
          success: false,
          message: "Invalid inquiry data.",
          errors: result.error.flatten().fieldErrors,
        },
        {
          status: 400,
        },
      );
    }

    const inquiry = result.data;

    const createdInquiry = await prisma.inquiry.create({
      data: inquiry,
    });

    return Response.json(
      {
        success: true,
        message: "Inquiry received successfully.",
        inquiryId: createdInquiry.id,
      },
      {
        status: 201,
      },
    );
  } catch {
    return Response.json(
      {
        success: false,
        message: "Invalid request.",
      },
      {
        status: 400,
      },
    );
  }
}