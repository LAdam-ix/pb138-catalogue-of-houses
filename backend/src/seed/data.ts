const password1 = '$argon2id$v=19$m=65536,t=3,p=4$6Qq/pFkY2H1DmUW8lsY2TA$U1i0yLPHZRtmXXQuGZbsbG9shDrIBrUJbaG+uKa6Xrw';
const password2 = '$argon2id$v=19$m=65536,t=3,p=4$ruZBK1xDe88hHOhvsjO4Yw$Al+yjmmREcvBZfytLr6S5oES80rex7oD3bqr8rtdu+E';
const password3 = '$argon2id$v=19$m=65536,t=3,p=4$9JorQa1FsTZ2EIKh0++icg$Z2oeKBHJ0R/faajF79wEoYGwd3wUpaYzUVc7X80OlXY';

export const imageLinksAccount = [
  {
    id: 'd1ce26af-1c65-1e5a-86a0-ec5a797d3d0f',
    path: './public/accountImages/d1ce26af-1c65-1e5a-86a0-ec5a797d3d0f.png',
  },
  {
    id: 'd5ae26af-86a0-4e5a-1c65-cc2a1f94a1a7',
    path: './public/accountImages/d5ae26af-86a0-4e5a-1c65-cc2a1f94a1a7.png',
  },
  {
    id: '256845cd-86a0-4e5a-1c65-ec5a797d3d0f',
    path: './public/accountImages/256845cd-86a0-4e5a-1c65-ec5a797d3d0f.png',
  },
];

export const accounts = [
  {
    id: 'f1fc5ae4-1c65-4e5a-86a0-ec5a797d3d0f',
    email: 'user1@example.com',
    name: 'Ethan',
    surname: 'Steinneck',
    avatarId: imageLinksAccount[0].id,
    hashedPassword: password1,
    type: 'USER',
    createdAt: new Date(2023, 6, 20),
  },
  {
    id: 'a32a8ea3-283b-4ad9-9a3f-cc2a1f94a1a7',
    email: 'user2@example.com',
    name: 'Amelia',
    surname: 'Mitchell',
    hashedPassword: password2,
    type: 'USER',
    createdAt: new Date(2023, 6, 19),
  },
  {
    id: '9a84618f-84ef-45b9-9eae-4a256118e1ce',
    email: 'designer1@example.com',
    name: 'Rina',
    surname: 'Ito',
    avatarId: imageLinksAccount[1].id,
    hashedPassword: password3,
    type: 'DESIGNER',
    createdAt: new Date(2023, 6, 18),
  },
  {
    id: 'd1ce26af-84ef-4ad9-9eae-cc2a1f94a1a7',
    email: 'designer2@example.com',
    name: 'Oliver',
    surname: 'Reed',
    avatarId: imageLinksAccount[2].id,
    hashedPassword: password3, 
    type: 'DESIGNER',
    createdAt: new Date(2023, 6, 13),
  },
];

export const houses = [
  {
    id: 'd1ce26af-ef39-4a12-b434-849be3589fb2',
    type: 'MANSION',
    name: 'Big \'o Cube House',
    price: 333333,
    description: 'CUBES CUBES CUBES CUBES CUBES CUBES CUBES CUBES',
    createdAt: new Date(2023, 6, 17),
    designerId: accounts[2].id,
  },
  {
    id: '46fb3669-b6de-4b64-8949-d2bb3a35fc71',
    type: 'FAMILY_HOUSE',
    name: 'Just a family home',
    price: 200000,
    description: 'Nice normal western family house. ',
    createdAt: new Date(2023, 6, 16),
    designerId: accounts[3].id,
  },
  {
    id: '33d38f18-6c11-4fe6-9e64-8db01780a1bf',
    type: 'MANSION',
    name: 'Mansion of Dreams',
    price: 333333,
    description: 'Experience the epitome of luxury living in this magnificent Mansion of Dreams.',
    createdAt: new Date(2023, 6, 17),
    designerId: accounts[2].id,
  },
  {
    id: 'c476a963-5a5e-482d-9d42-8c0efb3442b9',
    type: 'FAMILY_HOUSE',
    name: 'Cozy Family Retreat',
    price: 200000,
    description: 'Welcome to a warm and inviting Cozy Family Retreat, perfect for creating lifelong memories.',
    createdAt: new Date(2023, 6, 16),
    designerId: accounts[3].id,
  },
  {
    id: '0d5781f3-689f-4a67-981a-72e5ef50f91e',
    type: 'BUNGALOW',
    name: 'Seaside Bungalow Haven',
    price: 150000,
    description: 'Discover serenity and coastal charm in this idyllic Seaside Bungalow Haven.',
    createdAt: new Date(2023, 6, 15),
    designerId: accounts[2].id,
  },
  {
    id: 'a9f4d5e3-07f2-4e12-bb71-3ae3b9a35b47',
    type: 'APARTMENT',
    name: 'Urban Chic Apartment',
    price: 180000,
    description: 'Embrace modern city living in this stylish and sophisticated Urban Chic Apartment.',
    createdAt: new Date(2023, 6, 14),
    designerId: accounts[3].id,
  },
  {
    id: 'f2c8a1bd-61c8-4b95-86bc-8d5425844630',
    type: 'COTTAGE',
    name: 'Rustic Cottage Retreat',
    price: 120000,
    description: 'Escape to a picturesque Rustic Cottage Retreat surrounded by nature\'s beauty.',
    createdAt: new Date(2023, 6, 13),
    designerId: accounts[2].id,
  }
];

export const imageLinksHouses = [
  {
    id: 'd1ce26af-3364-1e5a-86a0-ec5a797d3d0f',
    path: './public/houseImages/d1ce26af-3364-1e5a-86a0-ec5a797d3d0f.png',
    houseId: houses[0].id
  },
  {
    id: 'a32a8ea3-283b-86a0-9a3f-cc2a1f94a1a7',
    path: './public/houseImages/a32a8ea3-283b-86a0-9a3f-cc2a1f94a1a7.png',
    houseId: houses[0].id
  },
  {
    id: '46fb3669-1c65-6e5a-86a0-ec5a797d3d0f',
    path: './public/houseImages/46fb3669-1c65-6e5a-86a0-ec5a797d3d0f.png',
    houseId: houses[0].id
  },
  {
    id: 'a32a8ea3-288b-4cd1-553f-cc2a1f94a1a7',
    path: './public/houseImages/a32a8ea3-288b-4cd1-553f-cc2a1f94a1a7.png',
    houseId: houses[1].id
  },
  {
    id: 'f1fc5ae4-283b-3ab5-9b3f-ec5a797d3d0f',
    path: './public/houseImages/f1fc5ae4-283b-3ab5-9b3f-ec5a797d3d0f.png',
    houseId: houses[1].id
  },
  {
    id: '9c42d791-5e48-4d4a-98be-2ba9a1fb924d',
    path: './public/houseImages/9c42d791-5e48-4d4a-98be-2ba9a1fb924d.png',
    houseId: houses[2].id,
  },
  {
    id: 'cf50c7fb-7801-44e1-8b92-31db1ad06299',
    path: './public/houseImages/cf50c7fb-7801-44e1-8b92-31db1ad06299.png',
    houseId: houses[2].id,
  },
  {
    id: '3c81e13f-88de-4f44-9321-21748f4f4f63',
    path: './public/houseImages/3c81e13f-88de-4f44-9321-21748f4f4f63.png',
    houseId: houses[3].id,
  },
  {
    id: '7dbfa273-dfa5-4f96-9a45-8b2d57d592a7',
    path: './public/houseImages/7dbfa273-dfa5-4f96-9a45-8b2d57d592a7.png',
    houseId: houses[3].id,
  },
  {
    id: '876bfdcc-764a-4a7c-8f55-abcde79e9a9f',
    path: './public/houseImages/876bfdcc-764a-4a7c-8f55-abcde79e9a9f.png',
    houseId: houses[4].id,
  },
  {
    id: 'fd1258f5-4e8f-42e7-a3fe-6d7f38c33fe3',
    path: './public/houseImages/fd1258f5-4e8f-42e7-a3fe-6d7f38c33fe3.png',
    houseId: houses[4].id,
  },
  {
    id: '2e4052e9-0985-42f4-a0d9-b609d5b6bc18',
    path: './public/houseImages/2e4052e9-0985-42f4-a0d9-b609d5b6bc18.png',
    houseId: houses[5].id,
  },
  {
    id: '1a5975c4-64ab-4c54-9766-95453f46e92d',
    path: './public/houseImages/1a5975c4-64ab-4c54-9766-95453f46e92d.png',
    houseId: houses[5].id,
  },
  {
    id: '37e74d4d-2b37-4bc9-95d9-2ce8df74db17',
    path: './public/houseImages/37e74d4d-2b37-4bc9-95d9-2ce8df74db17.png',
    houseId: houses[6].id,
  },
  {
    id: 'e1426e2e-d870-4d6f-8431-31a8c0341a3e',
    path: './public/houseImages/e1426e2e-d870-4d6f-8431-31a8c0341a3e.png',
    houseId: houses[6].id,
  },
];

export const ratings = [
  {
    id: '15cc4b6f-0f56-439d-92c4-0622715c7b68',
    score: 4,
    comment: 'Great designer!',
    createdAt: new Date(2023, 6, 20),
    customerId: accounts[0].id,
    designerId: accounts[2].id,
  },
  {
    id: '79e3f3ef-0642-40c6-a671-1a5a2223c45c',
    score: 5,
    comment: 'Excellent work!',
    createdAt: new Date(2023, 6, 19),
    customerId: accounts[0].id,
    designerId: accounts[3].id,
  },
  {
    id: '7e59a690-96c2-48e0-9d18-ee74507a9e3d',
    score: 4,
    comment: 'Good job!',
    createdAt: new Date(2023, 6, 18),
    customerId: accounts[1].id,
    designerId: accounts[2].id,
  },
  {
    id: '37feac4c-6225-4014-91de-0497b10b7f06',
    score: 3,
    comment: 'Could be better.',
    createdAt: new Date(2023, 6, 17),
    customerId: accounts[1].id,
    designerId: accounts[3].id,
  },
];

export const orders = [
  {
    id: '2b619a12-7727-4f0f-90ef-64a8c1d7a81e',
    price: 3333333,
    location: '9 LongRock Street, Ohio, USA',
    houseId: houses[0].id,
    createdAt: new Date(2023, 6, 21),
    customerId: accounts[0].id,
    designerId: accounts[3].id,
  },
  {
    id: 'd41c2b6e-22a7-4fb4-941d-88d019f10213',
    price: 250000,
    location: '11 Pond Street, Sligo, Ireland',
    houseId: houses[1].id,
    createdAt: new Date(2023, 6, 21),
    customerId: accounts[1].id,
    designerId: accounts[2].id,
  },
];
