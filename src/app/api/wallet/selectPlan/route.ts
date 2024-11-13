import { Envs } from "@/constants";
import { NextRequest, NextResponse } from "next/server";

/**
 * http://localhost:3000/api/test?name=Zhangsan&age=30
 * @param reqest
 * @returns
 */
export async function GET(reqest: NextRequest) {
  let params = reqest.nextUrl.searchParams;
  return NextResponse.json({
    data: {
      name: params.get("name"),
      age: params.get("age"),
      db: Envs.DB_WALLET,
    },
  });
}

/**
 * http://localhost:3000/api/test
 * {"name": "Zhangsan", "age": "30"}
 * @param reqest
 * @returns
 */
export async function POST(reqest: NextRequest) {
  let params = await reqest.json();
  return NextResponse.json({
    data: params,
  });
}
