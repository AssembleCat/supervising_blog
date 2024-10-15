function sendEmail() {
  // 폼 입력값 가져오기
  const isConference1 = document.getElementById("flexCheckFirst").checked; // 한국상담심리학회
  const isConference2 = document.getElementById("flexCheckSecond").checked; // 한국상담학회
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const phone = document.getElementById("phone").value;
  const message = document.getElementById("message").value;

  // 성공/실패 메시지 요소
  const successMessage = document.getElementById("submitSuccessMessage");
  const errorMessage = document.getElementById("submitErrorMessage");
  const inputErrorMessage = document.getElementById("inputErrorMessage");

  // 메시지 숨기기
  successMessage.classList.add("d-none");
  errorMessage.classList.add("d-none");
  inputErrorMessage.classList.add("d-none");

  if (name === "" || email === "" || phone === "" || message === "") {
    inputErrorMessage.classList.remove("d-none");
    return;
  }

  var conference1 = "No";
  var conference2 = "No";
  if (isConference1) {
    conference1 = "Yes";
  }
  if (isConference2) {
    conference2 = "Yes";
  }

  // EmailJS API로 이메일 전송
  const data = {
    service_id: "service_pf16a53", // EmailJS에서 발급받은 서비스 ID
    template_id: "template_wk9li8j", // EmailJS에서 발급받은 템플릿 ID
    user_id: "pyWu71DaG2LuGeHBq", // EmailJS에서 발급받은 Public Key
    template_params: {
      request_is_first: conference1,
      request_is_second: conference2,
      request_name: name,
      request_email: email,
      request_phone: phone,
      request_message: message,
    },
  };

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
