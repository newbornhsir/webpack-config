import $ from 'jquery';
$('body').append('<div>hello, module</div>');
console.log('i am async');
const name = 'module';
export default name;