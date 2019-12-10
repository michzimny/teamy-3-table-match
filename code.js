if(window.location.pathname.indexOf('mrunda1.html') > -1) {
  $(document).ready(function(){
    $('td.bdnt12').text('Results of both compared pairs of tables');
    $('td.s1').html('The match is played at three tables - one in open room and two in closed room.<br>The open room table is counted twice, against the two closed ones.');
    var ins = $('body > table > tbody > tr:last-child()');
    $(ins).before('<tr><td class="bdnt12">Overall results</td></tr>');
    $(ins).before('<tr><td><table cellspacing="0" id="sum_tab"></table></td></tr>');
    $('#sum_tab').append('<tr><td class="bdcc12">table</td><td class="bdcc2">&nbsp;</td><td class="bdcc2">seg.1</td><td class="bdcc2">seg.2</td><td class="bdcc2">&Sigma;after 2</td><td class="bdcc2">seg.3</td><td class="bdcc2">&plusmn;</td><td class="bdcc2">imps</td><td class="bdcc2">&nbsp;</td></tr>');
    
    var text = '<tr><td valign="middle" class="t1">&nbsp;&nbsp;&nbsp;</td><td class="bd"><img src="images/pl.jpg" alt="pl.jpg" class="fl">&nbsp;Poland&nbsp;<br><img src="images/de.jpg" alt="de.jpg" class="fl">&nbsp;Germany&nbsp;</td><td valign="middle" class="bdc"><SEG1></td><td valign="middle" class="bdc"><SEG2></td><td class="zec"><SEG12></td><td valign="middle" class="bdc"><SEG3></td><td valign="middle" class="bdc">&nbsp;<br>&nbsp;</td><td valign="middle" class="bdc"><SEG123></td><td class="bd">&nbsp;</td></tr>';
    var table1cells = [];
    var table2cells = [];
    $('tr > td > table > tbody > tr:nth-child(2) > td').each(function(key,value){
        var str = clean_str($(value).html());
    	if(str.match(sum_tables_pattern)) {
    	  console.log(str);
	  table1cells.push(str);
	}
    });
    $('tr > td > table > tbody > tr:nth-child(3) > td').each(function(key,value){
    	var str = clean_str($(value).html());
    	if(str.match(sum_tables_pattern)) {
	  table2cells.push(str);
	}
    });
    text = text.replace('<SEG1>', sum_tables(table1cells[0], table2cells[0]));
    text = text.replace('<SEG2>', sum_tables(table1cells[1], table2cells[1]));
    text = text.replace('<SEG12>', sum_tables(table1cells[2], table2cells[2]));
    text = text.replace('<SEG3>', sum_tables(table1cells[3], table2cells[3]));
    text = text.replace('<SEG123>', sum_tables(table1cells[4], table2cells[4]));
    $('#sum_tab').append(text);
  });
}

var sum_tables_pattern = /\D*(\d+)\D+(\d+)\D*/;
function sum_tables(cell1, cell2) {
  var m1 = cell1.match(sum_tables_pattern);
  var m2 = cell2.match(sum_tables_pattern);
  if(m1==null || m2==null) return '';
  var a = parseInt(m1[1])+parseInt(m2[1]);
  var b = parseInt(m1[2])+parseInt(m2[2]);
  return '&nbsp;&nbsp;'+a+'&nbsp;<br>&nbsp;&nbsp;'+b+'&nbsp;';
}

function clean_str(str) {
  return str.replace('<br>',' ').replace(/(<([^>]+)>)/ig,"");
}
