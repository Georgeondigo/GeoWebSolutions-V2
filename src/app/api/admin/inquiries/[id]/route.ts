import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

const allowedTransitions = {
  NEW: ["REVIEWED", "ARCHIVED"],
  REVIEWED: ["CONTACTED", "ARCHIVED"],
  CONTACTED: ["QUALIFIED", "ARCHIVED"],
  QUALIFIED: ["PROPOSAL", "LOST", "ARCHIVED"],
  PROPOSAL: ["WON", "LOST", "ARCHIVED"],
  WON: ["ARCHIVED"],
  LOST: ["ARCHIVED"],
  ARCHIVED: [],
} as const;

export async function GET(
  request: Request,
  context: { params: Promise<{ id: string }> },
) {
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

  const { id } = await context.params;

  try {
    const inquiry = await prisma.inquiry.findUnique({
      where: { id },
    });

    if (!inquiry) {
      return Response.json(
        {
          success: false,
          message: "Inquiry not found.",
        },
        { status: 404 },
      );
    }

    return Response.json({
      success: true,
      inquiry,
    });
  } catch (error) {
    console.error("Failed to retrieve inquiry:", error);

    return Response.json(
      {
        success: false,
        message: "Unable to retrieve inquiry.",
      },
      { status: 500 },
    );
  }
}

export async function PATCH(
  request: Request,
  context: { params: Promise<{ id: string }> },
) {
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

  const { id } = await context.params;

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

  if (
    typeof body !== "object" ||
    body === null ||
    !("status" in body) ||
    typeof body.status !== "string"
  ) {
    return Response.json(
      {
        success: false,
        message: "A valid status is required.",
      },
      { status: 400 },
    );
  }

  const requestedStatus = body.status;

  try {
    const inquiry = await prisma.inquiry.findUnique({
      where: { id },
    });

    if (!inquiry) {
      return Response.json(
        {
          success: false,
          message: "Inquiry not found.",
        },
        { status: 404 },
      );
    }

    const allowed = allowedTransitions[inquiry.status];

    if (!allowed.includes(requestedStatus as never)) {
      return Response.json(
        {
          success: false,
          message: `Cannot change inquiry status from ${inquiry.status} to ${requestedStatus}.`,
        },
        { status: 400 },
      );
    }

    const updatedInquiry = await prisma.inquiry.update({
      where: { id },
      data: {
        status: requestedStatus as typeof inquiry.status,
      },
    });

    return Response.json({
      success: true,
      inquiry: updatedInquiry,
    });
  } catch (error) {
    console.error("Failed to update inquiry:", error);

    return Response.json(
      {
        success: false,
        message: "Unable to update inquiry.",
      },
      { status: 500 },
    );
  }
}