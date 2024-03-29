import { useEffect, useState } from 'react';
import './todo.css';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const TodoApp = () => {

    let oldData = [];

    const [data, setData] = useState(oldData);



    useEffect(() => {

        let checkData = localStorage.getItem('item');

        if (checkData === null) {
            localStorage.setItem('item', JSON.stringify([]));
        }
        else {
            oldData = JSON.parse(localStorage.getItem('item'));
        }

        setData(() => [...oldData]);

    }, [])


   

    // *****************************************


    const addNewData = () => {
        let inputValue = document.querySelector('.input1').value;

        if(inputValue !== ''){
            toast('Item Added to the List');
        }
        else{
            toast('Please provide value');
        }

        const newDataObj = {
            id: data.length === 0 ? 1 : data.length + 1,
            para: inputValue,
            deco: 'none'
        }

        localStorage.setItem('item', JSON.stringify([...data, newDataObj]));

        setData([...data, newDataObj]);

        inputValue = '';

    }


    // *************************************************

    const checkedItem = (e, id) => {
        
        const iterateData = [...data];
        const newData = iterateData.map((item) => {
            let inputCheck = e.target;
            if(item.id === id){

                let para = inputCheck.parentElement.childNodes[1];
                console.log(inputCheck);

                if(inputCheck.checked){
                    console.log(inputCheck);
                    para.style.textDecoration = 'line-through';
                    item.deco = 'line-through';
                }
                else{
                    para.style.textDecoration = 'none';
                    item.deco = 'none';
                }
                
            }
            return item;
            
            // console.log(inputCheck.checked);
        })

        console.log(newData);

        localStorage.setItem('item', JSON.stringify([...newData]));
        setData(() => [...newData]);
    }



    // ************************************************


    const deleteItem = (id) => {

        const iterateData = [...data];
        const newData = iterateData.filter((item) => {
            
            // console.log(inputCheck.checked);
            return item.id !== id;
        })

        console.log(newData);
        toast('Item Deleted');

        localStorage.setItem('item', JSON.stringify([...newData]));
        setData(() => [...newData]);

    }




    return (
        <div className='container'>
            <div className='card'>
                <h1>To Do List</h1>
                <div className='card-input'>
                    <input className='input1' type='text'></input>
                    <button className='btn' onClick={addNewData}>Add Item</button>
                </div>
            </div>
            <div className='items'>
                {
                    data.map((item) => {
                        return (
                            <div className='item' key={item.id}>
                                <input onClick={(e) => checkedItem(e, item.id)} className='checked' type='checkbox'></input>
                                <p>{item.para}</p>
                                <button onClick={(e) => deleteItem(item.id)} className='delete'>Delete</button>
                            </div>

                        )
                    })
                }
            </div>
            <ToastContainer className='toast' />
        </div>
    )
}

export default TodoApp;