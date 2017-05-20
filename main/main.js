//载入所有的商品目录
const loadAllItems = require('./loadAllItems.js');
//主函数
module.exports = function main(inputs) 
{
	var item;//保存每一个加入清单的商品
	var item_list=[];//保存所有的商品    
	var list='***<没钱赚商店>购物清单***';//保存最终打印的字符串
	var sum=0;//记录商品总价格
	var AllItems  = loadAllItems();//载入所有的商品目录
	//循环遍历并处理输入数据
	for(var i = 0; i < inputs.length; i++)
	{
	//输入的barcode
	var barcode=inputs[i];
	//在商品目录中查找输入barcode对应的商品信息
  	for(var j = 0; j < AllItems.length; j++)
  	{
		    //找到该商品
 			if(barcode == AllItems[j].barcode)
 			{
 				item = AllItems[j];
				//首次加入item_list
 				if(item_list.length==0)
				{
					item.count=1;	
					item_list.push(item);
				}
				//item_list非空
				else
				{
					//遍历item_list
					for(var k = 0; k < item_list.length; k++)
					{
						//如果商品已经加入item_list，就将计数加1
						if(item.barcode==item_list[k].barcode)
						{
							item_list[k].count++;
							break;
						}
						//如果商品还未曾加入item_list，则加入该商品，将计数初始化为1
						else if(k==item_list.length-1)
						{
							item_list.push(item); 
							item.count=1;
							break;
						}
					}
				}
 				break;
 			}
 		}
 	}
	//遍历item_list，统计总价格，记录输出字符串
	for(var n = 0; n < item_list.length; n++)
	{  
		list=list+'\n'+'名称：'+item_list[n].name+'，'+'数量：'+item_list[n].count+item_list[n].unit+'，'+'单价：'+item_list[n].price+'.00(元)'+'，'+'小计：'+item_list[n].count*item_list[n].price+'.00(元)';
		sum+=item_list[n].count*item_list[n].price;
	}
	list=list+'\n'+'----------------------'+'\n'+'总计：'+sum+'.00(元)'+'\n'+'**********************';
	console.log(list);            
	return list;
}

