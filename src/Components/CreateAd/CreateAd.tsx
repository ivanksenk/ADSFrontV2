import { useState } from "react";
import { useCallback } from "react";
import { MdArrowForwardIos, MdArrowBack,MdDeleteForever,MdOutlinePhoto,MdAddAPhoto  } from "react-icons/md";
import './createAd.css'
import { AdCategories } from "../../Interfaces/createAd.interface";
import { useDropzone } from 'react-dropzone';

import imageCompression from "browser-image-compression";

interface CreateAdProps {

}

export const CreateAd: React.FC<CreateAdProps> = () => {
    const [activeStep, setActiveStep] = useState(0);
    const [category, setCategory] = useState(0);

    const [errMsg, setErrMsg] = useState('');

    const [subCategory, setSubCategory] = useState(0);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [message, setMessage] = useState('');

    interface FormData {
        title: string;
        description: string;
        files: File[];
        previews: string[];
    }

    const [formData, setFormData] = useState<FormData>({
        title: '',
        description: '',
        files: [],
        previews: []
    });

    const removeImage = (index: number) => {
        const newFiles = [...formData.files];
        const newPreviews = [...formData.previews];

        newFiles.splice(index, 1);
        newPreviews.splice(index, 1);

        setFormData(prev => ({
            ...prev,
            files: newFiles,
            previews: newPreviews
        }));
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const compressImages = async (files: File[]): Promise<File[]> => {
        const options = {
            maxSizeMB: 1, // Максимальный размер файла после сжатия
            maxWidthOrHeight: 1920, // Максимальная ширина или высота
            useWebWorker: true, // Использовать Web Worker для более быстрого сжатия
            fileType: 'image/webp', // Конвертировать в WebP для лучшего сжатия
        };

        const compressedFiles: File[] = [];

        try {
            for (const file of files) {
                const compressedFile = await imageCompression(file, options);
                compressedFiles.push(compressedFile);
            }
            return compressedFiles;
        } catch (error) {
            console.error('Ошибка при сжатии изображений:', error);
            throw error;
        }
    };

    const onDrop = useCallback((acceptedFiles: File[]) => {
        if (acceptedFiles?.length) {
            // Создаем превью для изображений
            const previews = acceptedFiles.map(file => URL.createObjectURL(file));

            setFormData(prev => ({
                ...prev,
                files: [...prev.files, ...acceptedFiles],
                previews: [...prev.previews, ...previews]
            }));
        }
    }, []);


    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: {
            'image/*': ['.jpeg', '.jpg', '.png', '.webp']
        },
        maxSize: 10 * 1024 * 1024 // 10MB
    });

    const categories: Array<AdCategories> = [
        {
            id: 1,
            title: 'Транспорт',
            subCategoies: [{ id: 1, title: 'Автомобили' }, { id: 2, title: 'Грузовики и спец техника' }, { id: 3, title: 'Мотоциклы и мотехника' }, { id: 3, title: 'ЗАпчасти и аксессуары' }]
        },
        {
            id: 2,
            title: 'Личные вещи'
        },
        {
            id: 3,
            title: 'Услуги'
        }
        ,
        {
            id: 4,
            title: 'Недвижимость'
        }
        ,
        {
            id: 5,
            title: 'Работа'
        }
        ,
        {
            id: 6,
            title: 'Для дома и дачи'
        }
        ,
        {
            id: 7,
            title: 'Электроника'
        }
        ,
        {
            id: 8,
            title: 'Животные'
        }
        ,
        {
            id: 9,
            title: 'Хобби и отдых'
        }
    ];

    console.log(category);

    const handleSetCategory = (idCategory: number) => {
        setCategory(idCategory);
        if (categories[idCategory - 1].subCategoies) {
            setActiveStep(1);
        }
        else {
            setActiveStep(2);
        }
    }


    const handleTitleNext = () => {
        if (!title || title.length < 5) {

            setErrMsg('Укажите название объявления, не меньше 5 символов')
        }
        else {
            setActiveStep(activeStep + 1)
        }

    }

    const handleDescrNext = () => {
        if (!description || description.length < 5) {

            setErrMsg('Укажите описание объявления, не меньше 5 символов')
        }
        else {
            setActiveStep(activeStep + 1)
        }

    }


    const handleSubCategory = (idCategory: number) => {
        setSubCategory(idCategory);
        setActiveStep(2);
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!formData.title || !formData.description || formData.files.length === 0) {
          setMessage('Пожалуйста, заполните все поля и загрузите хотя бы одно изображение');
          return;
        }
        
        setIsLoading(true);
        setMessage('');
        
        try {
          // Сжимаем изображения перед отправкой
          const compressedFiles = await compressImages(formData.files);
          
          const data = new FormData();
          data.append('title', formData.title);
          data.append('description', formData.description);
          
          compressedFiles.forEach(file => {
            data.append('images', file, file.name);
          });
          
        //   const response = await axios.post('http://localhost:5000/api/posts', data, {
        //     headers: {
        //       'Content-Type': 'multipart/form-data'
        //     }
        //   });
          
          setMessage('Форма успешно отправлена!');
          // Очищаем форму после успешной отправки
          setFormData({
            title: '',
            description: '',
            files: [],
            previews: []
          });
        } catch (error) {
          console.error('Ошибка при отправке формы:', error);
          setMessage('Произошла ошибка при отправке формы');
        } finally {
          setIsLoading(false);
        }
      };

    switch (activeStep) {
        case 0: return (
            <>
                <h3>Выберите категорию</h3>
                <ul className="create-ad__list">
                    {
                        categories.map((item) => {
                            return (<li key={item.id}><button className="flex create-ad__setCategory-btn" onClick={e => handleSetCategory(item.id)}>{item.title}<MdArrowForwardIos /></button></li>)
                        })
                    }
                </ul>
            </>
        )
        case 1:
            const subCategory = categories[category - 1].subCategoies;
            if (Array.isArray(subCategory)) {
                return (
                    <>
                        <h3>Уточните категорию</h3>
                        <button className="addAds-back-btn" onClick={e => { setActiveStep(activeStep - 1) }}><MdArrowBack /></button>
                        <ul className="create-ad__list">
                            {
                                subCategory.map((item) => {
                                    return (<li key={`sub_${item.id}`}><button className="flex create-ad__setCategory-btn" onClick={(e) => handleSubCategory(item.id)}>{item.title}<MdArrowForwardIos /></button></li>)
                                })
                            }
                        </ul>

                    </>
                )
            }
            setActiveStep(0);
            break;
        case 2:
            return (
                <>
                    <h3>Новое объявление</h3>
                    <button className="addAds-back-btn" onClick={e => { setActiveStep(activeStep - 1) }}><MdArrowBack /></button>
                    <div className="flex card addAds-card">
                        <label className="fld-cml flex">
                            <span className="input-label">Название объявления</span>
                            <input className="input" type="text" onChange={e => setTitle(e.target.value)} onInput={e => setErrMsg('')} />
                        </label>
                        <div>
                            {errMsg ? <p>{errMsg}</p> : null}
                            <button className="btn addAds-btn" onClick={e => { handleTitleNext() }}>Далее<MdArrowForwardIos /></button>
                        </div>
                    </div>
                </>
            )

        case 3:
            return (
                <>
                    <h3>Новое объявление</h3>
                    <button className="addAds-back-btn" onClick={e => { setActiveStep(activeStep - 1) }}><MdArrowBack /></button>
                    <div className="flex card addAds-card">
                        <label className="fld-cml flex">
                            <span className="input-label">Описание</span>
                            <textarea className="input" onChange={e => setDescription(e.target.value)} />
                        </label>
                        <div>
                            {errMsg ? <p>{errMsg}</p> : null}
                            <button className="btn addAds-btn" onClick={e => { handleDescrNext() }}>Далее<MdArrowForwardIos /></button>
                        </div>
                    </div>
                </>
            )
        case 4:
            return (
                <>
                    <h3>Добавьте фото</h3>
                    <button className="addAds-back-btn" onClick={e => { setActiveStep(activeStep - 1) }}><MdArrowBack /></button>
                  
                    <div className="flex card addAds-card">
                    <div className="flex  preview-container">
                            {formData.previews.map((preview, index) => (
                                <div key={index} className="preview-item"  style={{background:`url(${preview})`,backgroundSize:'cover',backgroundRepeat:'no-repeat'}}>
                                   
                                   
                                    <button type="button" className="removeButton" onClick={() => removeImage(index)}><MdDeleteForever /></button>
                                </div>
                            ))}
                        </div>
                        <div {...getRootProps()} className={`dropzone ${isDragActive ? 'active' : ''}`}>
                            <input {...getInputProps()} />
                            {isDragActive ? (
                                <>
                                <span className="input-label mb10">Прикрепите  фотографии</span>
                                <div className="photo-input"><MdAddAPhoto /></div>
                                </>
                            ) : (
                                <>
                                <span className="input-label mb10">Прикрепите фотографии</span>
                                <div className="photo-input"><MdAddAPhoto /></div>
                                </>
                            )}</div>
                    

                        <div>
                            {errMsg ? <p>{errMsg}</p> : null}
                            <button className="btn addAds-btn" onClick={e => { handleSubmit(e) }}>Добавить объявление<MdArrowForwardIos /></button>
                        </div>
                    </div >
                </>
            )

        default:
            setActiveStep(0);
            return (
                <h3>Упс, что то пошло не так(</h3>
            )
    }
};

