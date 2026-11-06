export const template = (otp, username, subject) => {
  return `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>${subject}</title>
      </head>

      <body
        style="
          margin: 0;
          padding: 0;
          background-color: #f5f5f5;
          font-family: Arial, Helvetica, sans-serif;
        "
      >
        <table
          width="100%"
          cellpadding="0"
          cellspacing="0"
          border="0"
          style="padding: 40px 0;"
        >
          <tr>
            <td align="center">

              <table
                width="600"
                cellpadding="0"
                cellspacing="0"
                border="0"
                style="
                  max-width: 600px;
                  width: 100%;
                  background-color: #ffffff;
                  border-radius: 12px;
                  overflow: hidden;
                "
              >

                <!-- Header -->
                <tr>
                  <td
                    style="
                      padding: 30px;
                      text-align: center;
                      background-color: #111827;
                      color: #ffffff;
                    "
                  >
                    <h1 style="margin: 0; font-size: 28px;">
                      Sara7a App
                    </h1>
                  </td>
                </tr>

                <!-- Content -->
                <tr>
                  <td style="padding: 40px 30px;">

                    <h2
                      style="
                        margin: 0 0 20px;
                        color: #111827;
                        font-size: 24px;
                      "
                    >
                      ${subject}
                    </h2>

                    <p
                      style="
                        margin: 0 0 15px;
                        color: #374151;
                        font-size: 16px;
                        line-height: 1.6;
                      "
                    >
                      Hello ${username},
                    </p>

                    <p
                      style="
                        margin: 0 0 25px;
                        color: #374151;
                        font-size: 16px;
                        line-height: 1.6;
                      "
                    >
                      Thank you for creating an account with Sara7a App.
                      Please use the verification code below to confirm your
                      email address.
                    </p>

                    <!-- OTP -->
                    <div
                      style="
                        margin: 30px 0;
                        padding: 20px;
                        text-align: center;
                        background-color: #f3f4f6;
                        border-radius: 10px;
                      "
                    >
                      <span
                        style="
                          display: block;
                          margin-bottom: 10px;
                          color: #6b7280;
                          font-size: 14px;
                        "
                      >
                        Your verification code
                      </span>

                      <strong
                        style="
                          display: block;
                          color: #111827;
                          font-size: 32px;
                          letter-spacing: 8px;
                        "
                      >
                        ${otp}
                      </strong>
                    </div>

                    <p
                      style="
                        margin: 0 0 10px;
                        color: #6b7280;
                        font-size: 14px;
                        line-height: 1.6;
                      "
                    >
                      This verification code is valid for 10 minutes.
                    </p>

                    <p
                      style="
                        margin: 0;
                        color: #6b7280;
                        font-size: 14px;
                        line-height: 1.6;
                      "
                    >
                      If you did not create this account, you can safely
                      ignore this email.
                    </p>

                  </td>
                </tr>

                <!-- Footer -->
                <tr>
                  <td
                    style="
                      padding: 20px 30px;
                      text-align: center;
                      background-color: #f9fafb;
                      color: #9ca3af;
                      font-size: 12px;
                    "
                  >
                    © ${new Date().getFullYear()} Sara7a App. All rights
                    reserved.
                  </td>
                </tr>

              </table>

            </td>
          </tr>
        </table>
      </body>
    </html>
  `;
};
