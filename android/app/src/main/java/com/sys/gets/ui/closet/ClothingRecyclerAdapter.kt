package com.sys.gets.ui.closet

import android.content.Context
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.ImageView
import androidx.recyclerview.widget.RecyclerView
import com.sys.gets.R

class ClothingRecyclerAdapter(val context: Context, val clothingList: ArrayList<ClothingItem>)
    : RecyclerView.Adapter<ClothingRecyclerAdapter.ViewHolder>(){

    class ViewHolder(itemView: View) : RecyclerView.ViewHolder(itemView) {
        val clothingImage: ImageView = itemView.findViewById(R.id.clothingImage)

        fun bind(cody: ClothingItem, context: Context) {
            if (cody.imageId != "") {
                val resourceId =
                    context.resources.getIdentifier(cody.imageId, "drawable", context.packageName)
                clothingImage.setImageResource(resourceId)
            } else {
                clothingImage.setImageResource(R.mipmap.ic_launcher)
            }
        }
    }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int)
            : ViewHolder {
        val v = LayoutInflater.from(parent.context)
            .inflate(R.layout.clothing_item, parent, false)
        return ViewHolder(v)
    }

    override fun onBindViewHolder(viewHolder: ViewHolder, position: Int) {
        viewHolder.bind(clothingList[position], context)
    }

    override fun getItemCount() = clothingList.size

}