export default function decorate(block) {
  const [first, second] = block.children;

  const picture = first.querySelector('picture');
  const textContainer = second.firstElementChild;

  block.innerHTML = '';

  if (picture) {
    block.append(picture);
  }

  if (textContainer) {
    textContainer.classList.add('hero-text');
    block.append(textContainer);
  }
}
