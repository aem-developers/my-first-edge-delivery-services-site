export default function decorate(block) {
  const img = block.querySelector('picture img');
  const bgSrc = img ? img.getAttribute('src') : '';
  const background = document.createElement('div');
  background.className = 'background';

  if (bgSrc) {
    background.style.backgroundImage = `url('${bgSrc}')`;
  }

  const foreground = document.createElement('div');
  foreground.className = 'foreground';

  const text = document.createElement('div');
  text.className = 'text';

  const eyebrowEl = document.createElement('div');
  eyebrowEl.className = 'eyebrow';
  const oldEyebrow = block.querySelector('p');
  eyebrowEl.textContent = oldEyebrow ? oldEyebrow.textContent.toUpperCase() : '';

  const titleWrap = document.createElement('div');
  titleWrap.className = 'title';
  const oldH3 = block.querySelector('h3');
  if (oldH3) {
    const h3 = document.createElement('h3');
    h3.id = oldH3.id;
    h3.textContent = oldH3.textContent;
    titleWrap.appendChild(h3);
  }

  const longDesc = document.createElement('div');
  longDesc.className = 'long-description';

  const ctaWrap = document.createElement('div');
  ctaWrap.className = 'cta';

  const ctaLink = document.createElement('a');
  ctaLink.href = '/quiz';
  ctaLink.title = 'Take our Coffee Quiz';
  ctaLink.className = 'button';
  ctaLink.textContent = 'Take our Coffee Quiz';

  ctaWrap.appendChild(ctaLink);

  text.appendChild(eyebrowEl);
  text.appendChild(titleWrap);
  text.appendChild(longDesc);
  text.appendChild(ctaWrap);

  foreground.appendChild(text);

  block.innerHTML = '';
  block.appendChild(background);
  block.appendChild(foreground);
}
