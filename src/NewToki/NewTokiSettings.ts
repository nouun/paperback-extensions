import {
  NavigationButton,
  SourceStateManager,
} from "paperback-extensions-common";

export type StateData = {
  domain: string
}

export const getStateData =
  async (stateManager: SourceStateManager): Promise<StateData> => {
    const domain = (await stateManager.retrieve("domain") as string)
      || "https://newtoki111.com";

    return { domain };
  };

const sectionGeneral = (stateManager: SourceStateManager) => createSection({
  id: "section_general",
  rows: () =>
    getStateData(stateManager).then(async (values: StateData) => [
      createInputField({
        id: "domain",
        label: "도메인",
        value: values.domain,
        maskInput: false,
        placeholder: "",
      }),
    ]),
});

const formGeneralSettings = (stateManager: SourceStateManager) => createForm({
  onSubmit: (data: StateData) =>
    Promise.all(
      Object.keys(data).map((key) => stateManager.store(key, data[key])),
    ).then(),
  validate: () => Promise.resolve(true),
  sections: () => Promise.resolve([ sectionGeneral(stateManager) ]),
});

export const menuGeneralSettings =
  (stateManager: SourceStateManager): NavigationButton =>
    createNavigationButton({
      id: "btn_settings_general",
      value: "",
      label: "General 설정",
      form: formGeneralSettings(stateManager),
    });

