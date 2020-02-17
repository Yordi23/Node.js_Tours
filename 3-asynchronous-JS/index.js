const fs = require('fs');
const superagent = require('superagent');

// With promises

const readFilePro = file => {
  return new Promise((resolve, reject) => {
    fs.readFile(file, (err, data) => {
      if (err) reject('I could not find that file');

      resolve(data);
    });
  });
};

const writeFilePro = (file, data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(file, data, err => {
      if (err) reject('Could not write the file');

      resolve('success');
    });
  });
};

const getDogPic = async () => {
  try {
    const data = await readFilePro(`${__dirname}/dog.txt`);
    console.log(`Breed: ${data}`);

    const res1Pro = superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);

    const res2Pro = superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);

    const res3Pro = superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);

    const all = await Promise.all([res1Pro, res2Pro, res3Pro]);
    const imgs = all.map(el => el.body.message);
    console.log(imgs);

    await writeFilePro('dog-img.txt', imgs.join('\n'));
    console.log('Random dog image saved to file');
  } catch (err) {
    console.log(err);
    throw err;
  }

  return '2: READY';
};

(async () => {
  try {
    console.log('1: Will get dog pic!');
    const x = await getDogPic();
    console.log(x);
    console.log('3: Done getting dog pic!');
  } catch (err) {
    console.log('ERROR');
  }
})();

// Using then for handling errors

// console.log('1: Will get dog pic!');
// getDogPic()
//   .then(x => {
//     console.log(x);
//     console.log('3: Done getting dog pic!');
//   })
//   .catch(err => {
//     console.log('ERROR');
//   });

//

//Using promises & then

// readFilePro(`${__dirname}/dog.txt`)
//   .then(data => {
//     console.log(`Breed: ${data}`);
//     return superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
//   })
//   .then(res => {
//     console.log(res.body.message);
//     return writeFilePro('dog-img.txt', res.body.message);
//   })
//   .then(() => {
//     console.log('Random dog image saved to file');
//   })
//   .catch(err => {
//     console.log(err);
//   });

//

// Whithout promises

// fs.readFile(`${__dirname}/dog.txt`, (err, data) => {
//   console.log(`Breed: ${data}`);

//   superagent.get(`https://dog.ceo/api/breed/${data}/images/random`).end((err, res) => {
//     if (err) return console.log(err.message);
//     console.log(res.body.message);

//     fs.writeFile('dog-img.txt', res.body.message, err => {
//       if (err) return console.log(err.message);
//       console.log('Image saved!');
//     });
//   });
// });
