export const getItems = async (url) => {
  try {
    const resp = await fetch(url);
    if (!resp.ok) {
      throw new Error("Ошибка получения данных");
    }
    const data = await resp.json();
    return data;
  } catch (error) {
    return error.message;
  }
};

export const getItem = async (url, callback) => {
  try {
    const resp = await fetch(url);
    return await callback(resp);
  } catch (error) {
    return error.message;
  }
};

export const addItem = async (url, item) => {
  try {
    const resp = await fetch(url, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(item),
    });

    if (!resp.ok) {
      throw new Error("Ошибка добавления");
    }

    return await resp.json();
  } catch (error) {
    return error.message;
  }
};

export const updateItem = async (url, patch) => {
  try {
    const resp = await fetch(url, {
      method: "PATCH",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(patch),
    });

    if (!resp.ok) {
      throw new Error("Ошибка обновления");
    }

    return await resp.json();
  } catch (error) {
    return error.message;
  }
};

export const removeItem = async (url) => {
  try {
    const resp = await fetch(url, {
      method: "DELETE",
    });
    if (!resp.ok) {
      throw new Error("Ошибка удаления");
    }
    return await resp.json();
  } catch (error) {
    return error.message;
  }
};

export const removeOrUpdateItem = async (url) => {
  const resp = await getItem(url, async (resp) => {
    if (!resp.ok) {
      throw new Error("Ошибка получения данных");
    }
    const data = await resp.json();
    return data;
  });

  if (resp instanceof Object) {
    if (resp.qty > 1) {
      const newQty = resp.qty - 1;
      const respUpdate = await updateItem(url, { qty: newQty });
      if (respUpdate instanceof Object) {
        return {
          action: "update",
          item: respUpdate,
        };
      } else {
        alert(respUpdate);
      }
    } else {
      const respRemove = await removeItem(url);
      if (respRemove instanceof Object) {
        return {
          action: "remove",
          item: respRemove,
        };
      } else {
        alert(respRemove);
      }
    }
  } else {
    alert(resp);
  }
};
