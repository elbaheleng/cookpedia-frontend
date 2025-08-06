import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(AllRecipe: any[], searchKey:string): any[] {
    let result:any = []
    if(!AllRecipe || searchKey == ""){
      return AllRecipe
    }

    result = AllRecipe.filter((item:any)=> item.name.toLowerCase().startsWith(searchKey.toLowerCase()))
    return result;
  }

}
