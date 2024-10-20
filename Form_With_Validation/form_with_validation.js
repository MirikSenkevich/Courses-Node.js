const express = require('express');

const webserver = express();

const port=8281;


function form1(values, errors)
{
    return`
    ${errors ? "есть ошибки, исправьте!" : ""}
    <form action='/send'>
      <span>${errors && errors.familiya||""}</span> <br>   
      фамилия: <input type=text name=familiya value="${removeHTML(values.familiya)}"> <br>
      <span>${errors && errors.imya||""}</span> <br>  
      имя: <input type=text name=imya value="${removeHTML(values.imya)}"> <br>
      <span>${errors && errors.otchestvo||""}</span> <br>   
      отчество: <input type=text name=otchestvo value="${removeHTML(values.otchestvo)}"> <br>
      <input type=submit value=заполнить>
    </form>
    `;
}

function form2(data){
    return `Поздравляю, ${escapeHTML(data.familiya)} ${escapeHTML(data.imya)} ${escapeHTML(data.otchestvo)}, Вы успешно заполнили форму`
}

function removeHTML(text)
{
    if (!text)
        return text;
    text=text.toString()
        .replaceAll("&","")
        .replaceAll("<","")
        .replaceAll(">","")
        .replaceAll('"',"")
        .replaceAll("'","");
    return text;
}
function escapeHTML(text)
{
    if (!text)
        return text;
    text=text.toString()
        .replaceAll("&","&amp")
        .replaceAll("<","&lt")
        .replaceAll(">","&gt")
        .replaceAll('"',"&quot")
        .replaceAll("'","&#039");
    return text;
}

webserver.get("/form", (req,res)=>
{
    req.query.familiya='';
    req.query.imya='';
    req.query.otchestvo='';
    res.send(form1(req.query,null));
})

webserver.get("/send", (req,res)=>
    {
        let kl=false;
        const error=[];
        if (!req.query.familiya)
        {
            error.familiya='заполните поле фамилия';
            kl=true;
        }
        if (!req.query.imya)
        {
            error.imya='заполните поле имя';
            kl=true;
        }
        if (!req.query.otchestvo)
        {
            error.otchestvo='заполните поле отчество';
            kl=true;
        }
        if (kl)
        {
            res.send(form1(req.query,error));
        }
        else
        {
            res.send(form2(req.query));
        }
    })

    webserver.listen(port,()=>{ 
        console.log("web server running on port "+port);
    });