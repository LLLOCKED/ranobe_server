const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  // Connect the client
  await prisma.$connect();
  console.log("Prisma connected");

  const chapter = await prisma.chapter.create({
      data: {
        number: 1,
        title: "Prolog",
        text: "Bla bla bla...",
        ranobe:{
          connect: {
            id: "6381d0b7bdb14c3d58fd7802"
          }
        },
        author: {
          connect: {
            id: '6381d0b6bdb14c3d58fd7801'
          }
        }
      }
    }
  );

  // const user = await prisma.user.create({
  //   data: {
  //     email: "vlad@ukr.net",
  //     name: "Vlad",
  //     password: "$2b$10$hmMZsFOpv3397jdX7oUtc.p28j6T066yH.6WYZp9AEqdc7wtFRVS2",
  //     ranobes: {
  //       create: [
  //         {
  //           title: "BATTLE THROUGH THE HEAVENS",
  //           description: "In a land where no magic is present. A land where the strong make the rules and the weak have to obey. A land filled with alluring treasures and beauty, yet also filled with unforeseen danger. Three years ago, Xiao Yan, who had shown talents none had seen in decades, suddenly lost everything. His powers, his reputation, and his promise to his mother. What sorcery has caused him to lose all of his powers? And why has his fiancee suddenly shown up?",
  //           categories: { create: [{ value: "harem", name: "Harem" }, { value: "comedy", name: "Comedy" }] }
  //         }
  //       ]
  //     }
  //   }
  // });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
