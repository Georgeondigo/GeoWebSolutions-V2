import { prisma } from "@/lib/prisma";
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

  try {
    const inquiry = await prisma.inquiry.create({
      data: result.data,
    });

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