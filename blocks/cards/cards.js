import { createOptimizedPicture } from '../../scripts/aem.js';

export default function decorate(block) {
  /* change to ul, li */
  const ul = document.createElement('ul');
  [...block.children].forEach((row) => {
    const li = document.createElement('li');
    while (row.firstElementChild) li.append(row.firstElementChild);
    [...li.children].forEach((div) => {
      // Use placeholder to prevent CLS
      if (div.children.length === 1 && div.querySelector('picture')) {
        div.className = 'cards-card-image';

        const picture = div.querySelector('picture');
        const img = picture.querySelector('img');

        const placeholder = document.createElement('div');
        placeholder.style.width = '100%';
        placeholder.style.height = 'auto';
        placeholder.style.aspectRatio = '4 / 3';
        placeholder.style.backgroundColor = '#eee';
        div.replaceChild(placeholder, picture);

        const optimized = createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]);
        setTimeout(() => {
          placeholder.replaceWith(optimized);
        }, 3000);
      } else {
        div.className = 'cards-card-body';
      }
    });
    ul.append(li);
  });
  ul.querySelectorAll('picture > img').forEach((img) => img.closest('picture').replaceWith(createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }])));
  block.replaceChildren(ul);
}
