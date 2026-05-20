import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    console.log("API /api/contact ejecutándose");

    const body = await request.json();

    const {
      fullName,
      email,
      phone,
      rut,
      plate,
      message,
    } = body;


    if (!fullName || !email || !phone) {
      return NextResponse.json(
        {
          ok: false,
          message: "Faltan campos obligatorios.",
        },
        { status: 400 }
      );
    }


    if (
      !process.env.SMTP_HOST ||
      !process.env.SMTP_USER ||
      !process.env.SMTP_PASS ||
      !process.env.CONTACT_TO
    ) {
      console.error("Faltan variables de entorno SMTP");

      if (process.env.NODE_ENV === "development") {
        console.log("--- MODO DESARROLLO ---");
        console.log("Simulación de envío de correo exitosa.");
        console.log("Datos del formulario:", body);
        console.log("------------------------");
        return NextResponse.json({
          ok: true,
          message: "Solicitud simulada correctamente en modo de desarrollo.",
        });
      }

      return NextResponse.json(
        {
          ok: false,
          message: "Error de configuración del servidor.",
        },
        { status: 500 }
      );
    }

    console.log("Variables SMTP cargadas correctamente");

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT || 465),


      secure: true,

      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });


    await transporter.verify();

    console.log("Conexión SMTP exitosa");


    const info = await transporter.sendMail({
      from: `"Sitio Web Plaza Car Service" <${process.env.SMTP_USER}>`,
      to: process.env.CONTACT_TO,
      replyTo: email,
      subject: `Nueva solicitud desde la web - ${fullName}`,
      html: `
        <div style="font-family: Arial, sans-serif; color: #111;">
          <h2>Nueva solicitud desde Plaza Car Service</h2>

          <p><strong>Nombre:</strong> ${fullName}</p>
          <p><strong>Correo:</strong> ${email}</p>
          <p><strong>Teléfono:</strong> ${phone}</p>
          <p><strong>RUT:</strong> ${rut || "No informado"}</p>
          <p><strong>Patente:</strong> ${plate || "No informada"}</p>

          <hr />

          <p><strong>Mensaje:</strong></p>
          <p>${message || "Sin mensaje adicional."}</p>
        </div>
      `,
    });

    console.log("Mail enviado:", info.messageId);

    return NextResponse.json({
      ok: true,
      message: "Solicitud enviada correctamente.",
    });

  } catch (error) {
    console.error("ERROR COMPLETO AL ENVIAR MAIL:");
    console.error(error);

    return NextResponse.json(
      {
        ok: false,
        message: "No se pudo enviar la solicitud.",
      },
      { status: 500 }
    );
  }
}
