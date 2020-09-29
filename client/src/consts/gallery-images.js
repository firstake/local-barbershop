function importAll(r) {
  return r.keys().map(r);
}

const jpgSources = importAll(require.context('../assets/img/gallery/', false, /\.(jpg)$/));
const webpSources = importAll(require.context('../assets/img/gallery/', false, /\.(webp)$/));

const images = [
  {
    id: 1,
    width: 700,
    height: 464,
  },
  {
    id: 2,
    width: 683,
    height: 1024,
  },
  {
    id: 3,
    width: 1024,
    height: 684,
  },
  {
    id: 4,
    width: 754,
    height: 1024,
  },
  {
    id: 5,
    width: 1024,
    height: 684,
  },
  {
    id: 6,
    width: 684,
    height: 1024,
  },
  {
    id: 7,
    width: 850,
    height: 567,
  },
  {
    id: 8,
    width: 684,
    height: 1024,
  },
  {
    id: 9,
    width: 1024,
    height: 678,
  },
];

images.map((imageData, index) => {
  imageData.jpg = jpgSources[index];
  imageData.webp = webpSources[index];
  return imageData;
});

export default images;
