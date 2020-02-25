import mycss from './css/index.css';
import myless from './css/black.less';
import mysass from './css/mysass.scss';
import $ from 'jquery';
import vue from 'vue';

{
  let hello = 'Hello';
  let hi = `${hello} Webpack`;
  document.getElementById('title').innerHTML=hi;
}

console.log(111);

$("#sassdiv").html('This is SASS!');