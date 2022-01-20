import React,{useState} from 'react';
import CloseIcon from '@mui/icons-material/Close';
import clsx from 'clsx';
import useStyles from "./styles"


const data =[
    {
       picture:'https://i.pinimg.com/736x/56/e2/2d/56e22d0ac4512870685bb887b4ac43e7.jpg',
       id: '1',
    },
    {
       picture:'https://d1kq2dqeox7x40.cloudfront.net/images/posts/20190605_H14E8ruWSFEYBMS.png',
       id: '2',
    },
    {
       picture:'https://mymodernmet.com/wp/wp-content/uploads/2021/04/franky-yang-chinese-inspired-tattoo-art-small-thumbnail-1.jpg',
       id: '3',
    },
    {
       picture:'https://t1.uc.ltmcdn.com/images/2/2/2/old_school_51222_0_600.jpg',
       id: '4',
    },
    {
       picture:'https://www.magazinehorse.com/wp-content/uploads/2020/10/IMG_9074-632x500.jpg',
       id: '5',
    },
    {
       picture:'https://www.trnd.com/es/blog/tatuajes-o-tattoos/01_full.jpg',
       id: '6',
    },
    {
       picture:'https://occ-0-1722-1723.1.nflxso.net/dnm/api/v6/9pS1daC2n6UGc3dUogvWIPMR_OU/AAAABZpEot6GJ5HmnCbDots0XO_T4crIpZ9iUNFQCKMGOEFAteH8Z-Gsn6DgAMzF27EmgzmwpKQPIV9VTMgD7w7mUldi9_ebT0N8meW1rF4A5YoEq7SZ.jpg?r=98e',
       id: '7',
    },
    {
       picture:'https://bornthiswaybodyarts.com/wp-content/uploads/2021/07/tattoo-image.jpg',
       id: '8',
    },
    {
       picture:'https://s3.amazonaws.com/spinne-images/424107/0_0.jpg',
       id: '9',
    },
    {
       picture:'https://exodustattooandpierce.com/files/2019/11/1574255837828_korey3.jpg',
       id: '10',
    },
    {
       picture:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQBXpm_w2NcMLs1ZHvtJISHg72w2qvN5c9s0g&usqp=CAU',
       id: '11',
    },
    {
       picture:'http://4.bp.blogspot.com/-fisKrzbYX-U/UbwuRVSrh8I/AAAAAAAAArw/0a3hqlNNjlk/s1600/Rose+Tattoo+Styles+Fresh+Images+2013+6.jpg',
       id: '12',
    },
    {
       picture:'https://post.healthline.com/wp-content/uploads/2021/03/New_tattoo_redness-1296x728-Gallery_slide1.jpg',
       id: '13',
    },
    {
        picture:'https://i.pinimg.com/474x/91/e0/8d/91e08d0c98053044ad5708077af65097.jpg',
        id: '14',
     },
 ]


export default function Gallery () {
    const classes = useStyles()
    
    // const [model, setModel] = useState(false);
    
    // const [tempicture,setTempicture] = useState('')
    
    // const getImg =(picture) =>{
    //     setTempicture(picture);
    //     setModel(true)
    // }

    return(
        <div>
            {/* <div className={clsx(model ? classes.zoomin : model) }>
                <img src={tempicture} className={classes.modelpic}/>
                <CloseIcon className={classes.svg} onClick={() => setModel(false)} />
            </div> */}
            <div className={classes.gallery}>
                {data.map((item, index) =>{
                return (
                    <div className={classes.pics} key={index} onClick={()=> getImg(item.picture)}>
                        <img src={item.picture} className={classes.picture} />
                    </div>
                    )
                    })
                }
            </div>
        </div>
    )
} 
