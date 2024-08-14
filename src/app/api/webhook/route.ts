import { db } from "@/lib/db";
import { stripe } from "@/lib/stripe";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import Stripe from "stripe";


export async function POST( req: Request) {
    const body = await req.text();
    const signature = headers().get("Stripe-Signature") as string;

    let event: Stripe.Event;

    try {
        event = stripe.webhooks.constructEvent(
            body,
            signature,
            process.env.STRIPE_WEBHOOK_SECRET!
        )
    } catch (error: any) {
        return new NextResponse(`Erro no Webhook: ${error.message}`, { status: 400 })
    }

    const session =  event.data.object as Stripe.Checkout.Session;
    const userId = session?.metadata?.userId;
    const courseId = session?.metadata?.courseId;

    if (event.type === "checkout.session.completed") {
        if (!userId || !courseId ) {
            return new NextResponse(`Erro no Webhook: Faltando metadata`, { status: 400 })
        }

        await db.purchase.create({
            data: {
                courseId: courseId,
                userId: userId,
            }
        });
    } else {
        return new NextResponse(`Erro no webhook: tipo de evento não tratado ${event.type}`, { status: 200 })
    }

    return new NextResponse(null, { status: 200 })
}