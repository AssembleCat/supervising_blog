function sendEmail() {
  // 폼 입력값 가져오기
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const phone = document.getElementById("phone").value;
  const message = document.getElementById("message").value;

  // EmailJS API로 이메일 전송
  const data = {
    service_id: "service_m8y9g4b", // EmailJS에서 발급받은 서비스 ID
    template_id: "template_og65l7e", // EmailJS에서 발급받은 템플릿 ID template_og65l7e
    user_id: "_S9PWN2WEE80xwpdj", // EmailJS에서 발급받은 사용자 ID
    template_params: {
      client_name: name,
      client_email: email,
      client_phone: phone,
      client_message: message,
    },
  };

  // 성공/실패 메시지 요소
  const successMessage = document.getElementById("submitSuccessMessage");
  const errorMessage = document.getElementById("submitErrorMessage");

  // 메시지 숨기기
  successMessage.classList.add("d-none");
  errorMessage.classList.add("d-none");

  // fetch를 이용해 EmailJS REST API에 요청 보내기
  fetch("https://api.emailjs.com/api/v1.0/email/send", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      if (response.ok) {
        // 전송 성공 시 성공 메시지 표시
        successMessage.classList.remove("d-none");
      } else {
        // 전송 실패 시 실패 메시지 표시
        errorMessage.classList.remove("d-none");
      }
    })
    .catch((error) => {
      console.error("FAILED:", error);
      // 오류 발생 시 실패 메시지 표시
      errorMessage.classList.remove("d-none");
    });
}
