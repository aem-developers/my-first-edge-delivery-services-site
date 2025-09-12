export default function decorate(block) {
  const img = block.querySelector('picture img');
  const bgSrc = img ? img.getAttribute('src') : '';

  const rewardContent = document.createElement('div');
  rewardContent.className = 'reward-content';

  if (bgSrc) {
    rewardContent.style.backgroundImage = `url('${bgSrc}')`;
  }

  const rewardLeft = document.createElement('div');
  rewardLeft.className = 'reward-left';

  const h4 = document.createElement('h4');
  h4.className = 'headline';

  const oldHeading = block.querySelector('h6');
  const h6 = oldHeading ? oldHeading.cloneNode(true) : document.createElement('h6');

  const pDetail = document.createElement('p');
  pDetail.className = 'detail';

  const oldParagraph = block.querySelector('p:not(:has(em))');
  const pDesc = oldParagraph ? oldParagraph.cloneNode(true) : document.createElement('p');

  rewardLeft.appendChild(h4);
  rewardLeft.appendChild(h6);
  rewardLeft.appendChild(pDetail);
  rewardLeft.appendChild(pDesc);

  const rewardRight = document.createElement('div');
  rewardRight.className = 'reward-right';

  const link = document.createElement('a');
  link.href = '/signup';
  link.className = 'button secondary';
  link.textContent = 'Claim Rewards';

  rewardRight.appendChild(link);

  rewardContent.appendChild(rewardLeft);
  rewardContent.appendChild(rewardRight);

  block.innerHTML = '';
  block.appendChild(rewardContent);
}
