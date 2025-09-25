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

  const section = block.closest('.section');

  // Simulate poor LCP with placeholder → then swap with raw image
  const lcpPlaceholder = document.createElement('div');
  lcpPlaceholder.style.width = '5957px';
  lcpPlaceholder.style.height = '3971px';
  lcpPlaceholder.style.maxWidth = 'none';
  lcpPlaceholder.style.background = '#eee';
  lcpPlaceholder.textContent = 'Loading huge image…';
  section.prepend(lcpPlaceholder);

  setTimeout(() => {
    const rawImage = document.createElement('img');
    rawImage.src = 'https://main--my-first-edge-delivery-services-site--aem-developers.aem.page/module-4/images/media_1db2e63a4c1003f5ac8733049f06a980689d901b4.jpg?t=' + Date.now();
    rawImage.alt = 'Unoptimized LCP test image';
    rawImage.style.width = '5957px';
    rawImage.style.height = '3971px';
    rawImage.style.maxWidth = 'none';
    rawImage.style.display = 'block';

    lcpPlaceholder.replaceWith(rawImage);
  }, 1500);

  // Simulate poor CLS with placeholder → then swap with raw image with different size
  const clsPlaceholder = document.createElement('div');
  clsPlaceholder.style.width = '1240px';
  clsPlaceholder.style.height = '600px';
  clsPlaceholder.style.background = '#eee';
  clsPlaceholder.textContent = 'Loading image…';
  section.prepend(clsPlaceholder);

  setTimeout(() => {
    const rawImage = document.createElement('img');
    rawImage.src = 'https://main--my-first-edge-delivery-services-site--aem-developers.aem.page/module-4/images/media_1db2e63a4c1003f5ac8733049f06a980689d901b4.jpg?t=' + Date.now();
    rawImage.alt = 'Unoptimized LCP test image';
    rawImage.style.width = '2000px';
    rawImage.style.height = '1333px';
    rawImage.style.display = 'block';
    rawImage.style.maxWidth = 'none';

    clsPlaceholder.replaceWith(rawImage);
  }, 1500);

  if (picture) {
    const img = picture.querySelector('img');
    block.append(createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]));
  }
  if (textContainer) {
    textContainer.classList.add('hero-text');
    block.append(textContainer);
  }
}
