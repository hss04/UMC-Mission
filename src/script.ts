console.log('스크립트 실행됨');

//1. html 요소 선택
const todoInput = document.getElementById('todo-input') as HTMLInputElement;
const todoForm = document.getElementById('todo-form') as HTMLFormElement;
const todoList = document.getElementById('todo-list') as HTMLUListElement;
const doenList = document.getElementById('done-list') as HTMLUListElement;
//2. 할 일이 어떻게 생긴지 type 정리
type ToDo= {
    id: number;
    text:string;
};

let todos:ToDo[]=[];
let doneTasks: ToDo[]= [];
  
  //-할 일 목록 렌더링 하는 함수 정의

const renderTask=():void=>{
    todoList.innerHTML='';   //들어있는 내용 싹 비우기
    doenList.innerHTML='';

    todos.forEach((todo)=>{
        const li=createTodoElement(todo,false);
        todoList.appendChild(li);
    });

    doneTasks.forEach((todo)=>{
        const li=createTodoElement(todo,true);
        doenList.appendChild(li);
    })
};

//3. 할 일 텍스트 입력 처리 함수
const getTodoText=():string=>{
    return todoInput.value.trim();
};

//4. 할 일 추가 처리 함수
const addTodo=(text:string):void =>{
    todos.push({id:Date.now(), text:text})
    todoInput.value='';
    renderTask();
};

//5. 할 일 상태 변경(완료로 이동)

const completeTask=(todo:ToDo):void =>{
    todos=todos.filter((t)=>t.id!==todo.id)
    doneTasks.push(todo);
    renderTask();
};

//6.완료된 할 일 삭제 함수
  const deleteTodo = (todo:ToDo):void =>{
     doneTasks=doneTasks.filter((t)=>t.id!==todo.id);
     renderTask();
  };


//7. 할 일 아이템 생성 함수(완료 여부에 따라 버튼 텍스트나 색상 설정
const createTodoElement=(todo:ToDo, isDone:boolean) =>{
    const li=document.createElement('li');
    li.classList.add('render-container__item');
    li.textContent=todo.text;

const button=document.createElement('button');
button.classList.add('render-container__item-button');

if(isDone)
{
    button.textContent="삭제";
    button.style.backgroundColor='#dc3545';
}
else
{
button.textContent='완료';
button.style.backgroundColor='#28a745';
}

button.addEventListener('click', ()=>{
   if(isDone){
    deleteTodo(todo);
   }
   else{
    completeTask(todo);
   }

});

  li.appendChild(button);
  return li;

};



//8. 폼 제출 이벤트 리스너      //suubmit 뜨면 이 이벤트 실행시켜라
todoForm.addEventListener('submit',(event:Event)=>{
    event.preventDefault();
    const text=getTodoText();
    if(text) {
        addTodo(text);
    }
});
renderTask();