"use server";
import { NextResponse } from "next/server"
import { connectToDB } from "../utils";
import { Request } from "../modals";

export const GET = async (req) => {
    console.log("rrrrrrrrrrrrrrrrr",req)
    try {
        await connectToDB()
        const allFriendRequests = await Request.find();
        return NextResponse.json({ isSuccess: true, statusCode: 200, returnLst: allFriendRequests })

    } catch (err) {
        console.log("error", err)
    }
}
export const POST = async (req) => {
    const body = await req.json();
    console.log("bbbbbbbbbbbbbb",body)
    try {
        await connectToDB()

        const newRequest = new Request(body)

        await newRequest.save();
        return NextResponse.json({ isSuccess: true, statusCode: 200, returnLst: newRequest })

    } catch (err) {
        console.log("error", err)
    }
}