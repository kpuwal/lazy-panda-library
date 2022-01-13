type pickerType = {label: string, value: string};

export const cleanData = (data: any) => {
  if (data.totalItems !== 0) {
    const bookInfo = data.items[0].volumeInfo;
    const bookSubtitle = bookInfo.subtitle === undefined ? "" : bookInfo.subtitle;

    return {
      isFound: true,
      title: lowerCaseAllWordsExceptFirstLetters(bookInfo.title + '. ' + bookSubtitle),
      author: lowerCaseAllWordsExceptFirstLetters(bookInfo.authors.join(', ')),
      language: bookInfo.language,
      publishedDate: bookInfo.publishedDate,
      pageCount: bookInfo.pageCount,
    };
  } else {
    return { isFound: false };
  }
}

export const cleanPickerData = (data: any) => {
  const shiftedValues = data.values.map((item: string[]) => {
    item.shift();
    return item;
  })

  return {
    genre: createPickerCategory(shiftedValues[0]),
    series: createPickerCategory(shiftedValues[1]),
    world: createPickerCategory(shiftedValues[2]),
    readBy: createPickerCategory(shiftedValues[3]),
  };
}

const createPickerCategory = (items: string[]) => {
  return items.map((el: string): pickerType  => 
    {
      return {
        label: el,
        value: el
      }
    }
  )
}

function lowerCaseAllWordsExceptFirstLetters(string: string) {
  return string.replace(/\S*/g, function (word) {
      return word.charAt(0) + word.slice(1).toLowerCase();
  });
}