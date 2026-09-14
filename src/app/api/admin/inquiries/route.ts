import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    return Response.json(
      {
        success: false,
        message: "Unauthorized.",
      },
      { status: 401 },
    );
  }

  try {
    const inquiries = await prisma.inquiry.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return Response.json({
      success: true,
      inquiries,
    });
  } catch (error) {
    console.error("Failed to retrieve inquiries:", error);

    return Response.json(
      {
        success: false,
        message: "Unable to retrieve inquiries.",
      },
      { status: 500 },
    );
  }
}