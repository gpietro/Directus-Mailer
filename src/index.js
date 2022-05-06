export default (router, { services, exceptions, env }) => {
  const { MailService } = services;

  router.post("/", async (req, res, schema) => {
    const mailService = new MailService({ schema });

    if (env.EMAIL_ALLOW_GUEST_SEND == null || !env.EMAIL_ALLOW_GUEST_SEND) {
      if (req.accountability.user == null || req.accountability.role == null) {
        return res.status(400).send({
          message:
            "User not authorized, enable guest sending or include a token",
        });
      }
    }

    if (req.body) {
      try {
        const sendMail = await mailService.send(req.body);
        console.log(sendMail);
        return res.send({
          status: "success",
        });
      } catch (err) {
        return res.send({
          status: err,
        });
      }
    }
  });
};