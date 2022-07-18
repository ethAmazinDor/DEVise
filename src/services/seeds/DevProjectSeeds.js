const { faker } = require('@faker-js/faker');
const MongoClient = require('mongodb').MongoClient;
const  DevProjects = require('../models/DevProjects');


async function seedDevProjects() {
  console.log('Seeding dev projects...');
  const client = new MongoClient('mongodb://localhost:27017/devise', { useNewUrlParser: true });
  await client.connect();
  const db = client.db();
  await db.collection('devprojects').deleteMany({});
  const devprojects = db.collection('devprojects');
  const devProjectSchema = [];
  for (let i = 0; i < 10; i++) {
    const Project = new DevProjects({
      title: faker.name.title(),
      description: faker.lorem.paragraph(10),
      summary: faker.lorem.sentence(3),
      author: faker.name.firstName(),
      mainImage: faker.image.imageUrl(),
      images: [faker.image.imageUrl(), faker.image.imageUrl(), faker.image.imageUrl()],
      videos: [faker.image.imageUrl(), faker.image.imageUrl(), faker.image.imageUrl()],
      tags: [faker.lorem.word(), faker.lorem.word(), faker.lorem.word()],
      createdAt: faker.date.past(),
      updatedAt: faker.date.past(),
    })
    devProjectSchema.push(Project);
  }
  await devprojects.insertMany(devProjectSchema);
  await client.close();
}

module.exports = seedDevProjects;

