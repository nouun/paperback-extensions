import {
  NavigationButton,
  SourceStateManager,
} from "paperback-extensions-common";

class HomeSection {
  private static IDs = [
    {
      id: "일반웹툰",
      default: true,
    },
    {
      id: "성인웹툰",
      default: false,
    },
    {
      id: "BL/GL",
      default: false,
    },
  ];

  static getIDs = () =>
    HomeSection.IDs.map((id) => id.id);

  static getDefaults = () =>
    HomeSection.IDs.filter((id) => id.default);
}

export type StateData = {
  domain: string
  homeSections: string[],
}

export const getStateData =
  async (stateManager: SourceStateManager): Promise<StateData> => {
    const domain = (await stateManager.retrieve("domain") as string)
      || "https://newtoki111.com";
    const homeSections = (await stateManager.retrieve("homeSections") as string[])
      || HomeSection.getDefaults();

    return {
      domain,
      homeSections,
    };
  };

const sectionGeneral = (stateManager: SourceStateManager) => createSection({
  id: "section_general",
  rows: () =>
    getStateData(stateManager).then(async (values: StateData) => [
      createSelect({
        id: "homeSections",
        label: "활성 홈 섹션",
        options: HomeSection.getIDs(),
        displayLabel: (id) => id,
        value: values.homeSections,
        allowsMultiselect: true,
      }),
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
      label: "설정",
      form: formGeneralSettings(stateManager),
    });

