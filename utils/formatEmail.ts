export function formatEmail(email: string) {
  if (email.includes("@")) {
    const splitedEmail = email.split("@");
    const slicedEmail = splitedEmail[0].slice(0, 4);

    // sash@gmail.com
    return slicedEmail.concat("***", splitedEmail[1]);
  }
}
