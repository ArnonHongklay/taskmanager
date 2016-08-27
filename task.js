
$(document).ready(function(){
var TaskManager = function(){};

TaskManager.load = function(){

  $.get('php/read_tasks_xml.php',null,function(data){

    $('ul.droppable').empty();

    var xmlDoc = $(data);
    xmlDoc.find('Task').each(function(){

      var TaskId = $(this).attr('TaskId');
      var StatusId = $(this).attr('StatusId');

      var Description = $(this).find('Description').text();
      var SortOrder = $(this).find('SortOrder').text();
      var StartTime = $(this).find('StartTime').text();
      var EndTime = $(this).find('EndTime').text();

      var ResName = $(this).find('Responsible').find('Name').text();
      var ResEmail = $(this).find('Responsible').find('Email').text();

      var li = $('<li></li>');

      li.attr('data-taskid',TaskId);
      li.attr('data-statusid',StatusId);
    
      li.append('<h3>Task #'TaskId'</h3>')
        .append(Description);

      if(StartTime != '')
        li.append('<br><b>StartTime : </b>'  StartTime);
      if(EndTime != '')
        li.append('<br><b>StartTime : </b>'  EndTime);

      if(ResName != '')
        li.append('<br><b>Responsible : </b>'  ResName  '-'  ResEmail);

      if(StatusId != 'I')
        li.append('<a href="javascript:;" class="link_delete" data-taskid="'TaskId'">Delete</a>');
      else 
        li.append('<a href="javascript:;" class="link_complete" data-taskid="'TaskId'">Complete</a>');
      
      $('#'StatusId).append(li);

      $('#count_B').text($('#B').find('li').length);
      $('#count_I').text($('#I').find('li').length);
      $('#count_D').text($('#D').find('li').length);

      li.hide().fadeIn(100);
      li.addClass('draggable');

      TaskManager.init();
    });

  },'xml');

};
TaskManager.insert = function(form){
  $.post('php/insert_task.php',form.serialize(),function(){
    TaskManager.load();
  });
};

$('#btnAdd').live('click',function(){
  
  $('#frmAdd').submit();

  return false;
});
$('#frmAdd').live('submit',function(){
  if($("#TaskDescription").val() == ''){
    $('#TaskDescription').css('background','#FF3333');
  }
  else {

    $('#TaskDescription').css('background','none');
    TaskManager.insert($(this));
  }
  return false;
});

TaskManager.delete = function(id){
  $.post('php/delete_task.php',"TaskId="id);
};

$('.link_delete').live('click',function(){
  if(!confirm('Do you want delete ? ')) return false;

  var TaskId = $(this).attr('data-taskid');

  TaskManager.delete(TaskId);

  $('ul.droppable').find('li[data-taskid="'TaskId'"]').fadeOut(500,function(){
    TaskManager.load();
  });

});


TaskManager.complete = function(id){
  $.post('php/complete_task.php',"TaskId="id);
};

$('.link_complete').live('click',function(){

  var TaskId = $(this).attr('data-taskid');

  TaskManager.complete(TaskId);

  $('ul.droppable').find('li[data-taskid="'TaskId'"]').fadeOut(500,function(){
    TaskManager.load();
  });

});

TaskManager.init = function(){
  $('.droppable').droppable({
    over:function(event,ui){
      var status = $(ui.draggable).attr('data-statusid');
      var id = $(this).attr('id');

      if((status == 'B' && id != 'D') || (status == 'I') || (status == 'D' && id == 'D')){
        $(this).addClass('valid');
      }else {
        $(this).addClass('invalid');
      }

    },
    out:function(event,ui){
      $(this).removeClass('invalid');
      $(this).removeClass('valid');
    },
    drop:function(event,ui){

      $(this).removeClass('invalid');
      $(this).removeClass('valid');


      var status = $(ui.draggable).attr('data-statusid');
      var id = $(this).attr('id');

      if(status == 'B'){
        if(id == 'I' && $(ui.draggable).attr('dragin') != 'I'){

          $(ui.draggable).appendTo($(this)).css('top',0).css('left',0);

          $(ui.draggable).attr('dragin','I');

          var form = $('<form id="frmProgress"></form>');
          var sel = $('<select name="ResponsibleId"></select>');

          form.append('<input type="hidden" name="SortOrder" value="'$(ui.draggable).index()'" />');
          form.append('<input type="hidden" name="StatusId" value="I" />');
          form.append('<input type="hidden" name="TaskId" value="'$(ui.draggable).attr('data-taskid')'" />');

          form.append('<br><b>Responsible : </b><br>');

          $.get('php/read_responsibles_xml.php',null,function(data){
            var xmlDoc = $(data);

            xmlDoc.find('Responsible').each(function(){
              var ResponsibleId = $(this).attr('ResponsibleId');
              var Name = $(this).find('Name').text();
              var Email = $(this).find('Email').text();

              sel.append('<option value="'ResponsibleId'">'Name ' - ' Email'</option>');
            });
          },'xml');

          form.append(sel)
            .append('<a href="javascript:;" class="link_save">save</a>')
            .append('<a href="javascript:;" class="link_cancel">cancel</a>');

          $(ui.draggable).append(form);
          $(ui.draggable).find('.link_delete').remove();

        }else {
          $(ui.draggable).css('top',0).css('left',0);
        }
      }
      else if(status == 'I'){
        if(id == 'B'){
          $(ui.draggable).appendTo($(this)).css('top',0).css('left',0);
          if(!confirm('You want drag this task to Blacklog (Yes Or No)')){
            $(ui.draggable).css('top',0).css('left',0);
            return false;
          }
          var TaskId = $(ui.draggable).attr('data-taskid');
          TaskManager.edit(TaskId);

          $(ui.draggable).fadeOut(500,function(){
            TaskManager.load();
          })


        }else if(id == 'D'){
          $(ui.draggable).appendTo($(this)).css('top',0).css('left',0);

          var TaskId = $(ui.draggable).attr('data-taskid');
          TaskManager.complete(TaskId);

          $(ui.draggable).fadeOut(500,function(){
            TaskManager.load();
          })
        }

      }
      else if(status == 'D'){
        $(ui.draggable).css('top',0).css('left',0);
      }

    }
  });

  $('.draggable').draggable({
    appendTo:'.droppable',
    cursor:'move',
    revert:'invalid'
  });
};

TaskManager.edit = function(id){
  $.post('php/edit_task.php',"TaskId="id);
};

$('.link_save').live('click',function(){
  $("#frmProgress").submit();

  return false;
});

$('.link_cancel').live('click',function(){
  TaskManager.load();

  return false;
});

$('#frmProgress').live('submit',function(){
  TaskManager.update($(this));

  return false;
});

TaskManager.update = function(form){
  $.post('php/update_task.php',form.serialize(),function(){
    TaskManager.load();
  });
}



TaskManager.load();
});
