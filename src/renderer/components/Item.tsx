import * as React from "react";
import { ItemType } from '../interfaces/common';
import './Item.scss';

interface ItemProps {
  item: ItemType
}

export const Item = (props: ItemProps) => (
  <ul>
    <li>{props.item.user_id}</li>
    <li><a href={props.item.url} target="_blank">{props.item.title}</a></li>
    <li>{props.item.created_at.toString()}</li>
  </ul>
);