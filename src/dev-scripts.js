import * as model from '@/libs/model';
import * as util from '@/libs/util';

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

// upgrade model version
function upgradeModelVersion(version)
{
  console.log('upgrade model version');
}

// test play queues
function testPlayQueues()
{
  util.playQueue([0,1,2,3], async (o) => {
    console.log('process queue', o);
    await util.sleep(1000);
  }).then(() => {
    console.log('COMPLETE QUEUES!');
  });
}

export default function ()
{
  window.dev = {
    addBoardItem,
    removeItems,
    upgradeModelVersion,
    testPlayQueues,
  };
}
