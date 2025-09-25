import { createOptimizedPicture } from '../../scripts/aem.js';

export default function decorate(block) {
  // Destructures the picture and text rows
  // first - first row => image
  // second - second row => text
  const [first, second] = block.children;

  // find the picture in the first row
  // find the text in the second row
  const picture = first.querySelector('picture');
  const textContainer = second.firstElementChild;

  // clear the block html, we're going to rebuild it
  block.innerHTML = '';

  // Simulate poor LCP
  const rawImage = document.createElement('img');
  rawImage.src = 'https://main--my-first-edge-delivery-services-site--aem-developers.aem.page/module-4/images/media_1db2e63a4c1003f5ac8733049f06a980689d901b4.jpg';
  rawImage.alt = 'Unoptimized LCP test image';
  rawImage.loading = 'eager';
  rawImage.width = 1600;
  rawImage.height = 1066;

  block.append(rawImage);
  if (picture) {
    const img = picture.querySelector('img');
    block.append(createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]));
  }
  if (textContainer) {
    textContainer.classList.add('hero-text');
    block.append(textContainer);
  }
}
