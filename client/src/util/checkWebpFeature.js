export const checkWebpFeature = (feature) => {
  /* eslint-disable max-len */
  const testImages = {
    lossy: 'UklGRiIAAABXRUJQVlA4IBYAAAAwAQCdASoBAAEADsD+JaQAA3AAAAAA',
    lossless: 'UklGRhoAAABXRUJQVlA4TA0AAAAvAAAAEAcQERGIiP4HAA==',
    alpha: 'UklGRkoAAABXRUJQVlA4WAoAAAAQAAAAAAAAAAAAQUxQSAwAAAARBxAR/Q9ERP8DAABWUDggGAAAABQBAJ0BKgEAAQAAAP4AAA3AAP7mtQAAAA==',
    animation: 'UklGRlIAAABXRUJQVlA4WAoAAAASAAAAAAAAAAAAQU5JTQYAAAD/////AABBTk1GJgAAAAAAAAAAAAAAAAAAAGQAAABWUDhMDQAAAC8AAAAQBxAREYiI/gcA',
  };
  /* eslint-enable */

  const img = new Image();

  return new Promise((resolve, reject) => {
    img.onload = function() {
      const result = (img.width > 0) && (img.height > 0);
      resolve(result);
    };

    img.onerror = function() {
      resolve(false);
    };

    img.src = `data:image/webp;base64,${testImages[feature]}`;
  });
};
