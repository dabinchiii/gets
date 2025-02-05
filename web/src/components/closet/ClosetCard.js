import React, {useEffect, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import axios from "axios";
import {Menu, MenuItem} from "@material-ui/core";
import {useTranslation} from "react-i18next";
import {useHistory} from 'react-router-dom';
import link from "../../link";

const useStyles = makeStyles({
    root: {
        width: 310,
        borderRadius: 10,
    },
    media: {
        height: 370,
    },
});

const ClosetCard = ({item, onRemove, category}) => {
    const classes = useStyles();
    const {t, i18n} = useTranslation();
    const history = useHistory();
    const [anchorEl, setAnchorEl] = useState(null);
    const {id, price} = item
    const [imageId, setImageId] = useState(`${id}`);
    useEffect(() => {
        if (category === 'product') {
            setImageId(`${id}_1`)
        } else {
            setImageId(`${id}`)
        }
    })
    const onCardClick = () => {
        if (id !== undefined) {
            if (category === 'product') {
                history.push({
                    pathname: `/product/${id}`
                })
            } else {
                history.push({
                    pathname: `/closet/coordination/${id}`
                })
            }
        } else {
            alert("내 옷장에 코디를 추가하고 상세정보를 확인해보세요!")
        }
    }

    const handleClick = e => {
        setAnchorEl(e.currentTarget);
    }
    const handleClose = () => {
        setAnchorEl(null);
    }
    const handleDeleteClick = () => {
        if (id !== undefined) {
            axios.get(`${link.base}/${category}/unfavorite/${id}`, {withCredentials: true})
                .then(response => {
                    setAnchorEl(null);
                    {
                        onRemove(id)
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
        } else {
            alert("내 옷장에 코디를 추가하고 상세정보를 확인해보세요!")
        }
    }
    return (
        <div className="closet_card">
            <Card className={classes.root}>
                <CardActionArea>
                    <IconButton aria-label="settings"
                                style={{color: "black", position: "absolute", zIndex: 1, right: 0}}
                                onClick={handleClick}>
                        <MoreVertIcon/>
                    </IconButton>
                    <Menu
                        id="option_menu"
                        anchorEl={anchorEl}
                        keepMounted
                        open={Boolean(anchorEl)}
                        onClose={handleClose}

                    >
                        <MenuItem onClick={handleDeleteClick} style={{
                            fontFamily: 'Noto Sans KR',
                            fontSize: '1.25rem'
                        }}>{t("delete")}</MenuItem>
                        {/*<MenuItem onClick = {handleModifyClick}>{t("modify")}</MenuItem>*/}
                    </Menu>
                    <CardMedia
                        className={classes.media}
                        image={`${link.base}/${category}/image/${imageId}`}
                        onClick={onCardClick}
                        style={{
                            position: 'relative'
                        }}
                    >
                    </CardMedia>
                </CardActionArea>
            </Card>
            <h2>{price ? price.toLocaleString() : ""}</h2>
        </div>
    );
}

export default ClosetCard;