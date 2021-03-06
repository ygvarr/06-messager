import React from 'react'
import loadingImg from '../../../Media/loading.svg'
import classes from './Preloader.module.css'

const Preloader: React.FC = () => <div className={classes.Preloader}><img src={loadingImg} alt=''/></div>
export default Preloader