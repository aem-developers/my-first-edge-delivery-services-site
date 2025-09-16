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
    block.append(picture);
  }
  if (textContainer) {
    textContainer.classList.add('hero-text');
    block.append(textContainer);
  }
}
