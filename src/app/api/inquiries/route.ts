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

    console.log("Validated inquiry:", inquiry);

    return Response.json(
      {
        success: true,
        message: "Inquiry received successfully.",
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