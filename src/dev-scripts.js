import * as model from '@/libs/model';

// add board
function addBoardItem(box, date = null, body = 'body content')
{
  if (!box)
  {
    console.error('no box');
    return;
  }
  let pureDate = new Date();
  date = date.split('-');
  pureDate.setFullYear(date[0]);
  pureDate.setMonth(date[1] - 1);
  pureDate.setDate(date[2]);
  model.addItem('board', {
    box,
    date: pureDate,
    body
  }).then(res => console.log('success add item', res));
}

function removeItems(store, srl, key)
{
  model.removeItems(store, srl, key).then((res) => {
    console.log('success remove items');
  });
}

export default function ()
{
  window.dev = {
    addBoardItem,
    removeItems
  }
}



// await removeItems('board', 1, 'box');