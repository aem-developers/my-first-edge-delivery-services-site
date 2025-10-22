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

  if (picture) {
    const img = picture.querySelector('img');
    block.append(createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]));
  }
  if (textContainer) {
    textContainer.classList.add('hero-text');
    block.append(textContainer);
  }
}
