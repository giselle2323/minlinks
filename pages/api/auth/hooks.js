import prisma from '../../../lib/prisma';
module.exports = async (req, res) => {
    const { email, name, secret } = req.body
    console.dir(email, name, secret);
  if (secret === process.env.AUTH0_USER_HOOK && req.method === 'POST') {
    try {
            await prisma.user.create({
            data: { email, name },
          })
    } catch (err) {
      console.log(err)
    } finally {
            await prisma.$disconnect()
      res.send({ received: true })
        }
  } else {
    res.send('You forgot to send me your secret!')
  }
}