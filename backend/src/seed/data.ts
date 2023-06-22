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
    price: 3333333,
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
];

export const imageLinksHouses = [
  {
    id: 'd1ce26af-3364-1e5a-86a0-ec5a797d3d0f',
    path: './public/accountImages/houseImages/d1ce26af-3364-1e5a-86a0-ec5a797d3d0f.png',
    houseId: houses[0].id
  },
  {
    id: 'a32a8ea3-283b-86a0-9a3f-cc2a1f94a1a7',
    path: './public/accountImages/houseImages/a32a8ea3-283b-86a0-9a3f-cc2a1f94a1a7.png',
    houseId: houses[0].id
  },
  {
    id: '46fb3669-1c65-6e5a-86a0-ec5a797d3d0f',
    path: './public/accountImages/houseImages/46fb3669-1c65-6e5a-86a0-ec5a797d3d0f.png',
    houseId: houses[0].id
  },
  {
    id: 'a32a8ea3-288b-4cd1-553f-cc2a1f94a1a7',
    path: './public/accountImages/houseImages/a32a8ea3-288b-4cd1-553f-cc2a1f94a1a7.png',
    houseId: houses[1].id
  },
  {
    id: 'f1fc5ae4-283b-3ab5-9b3f-ec5a797d3d0f',
    path: './public/accountImages/houseImages/f1fc5ae4-283b-3ab5-9b3f-ec5a797d3d0f.png',
    houseId: houses[1].id
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
