import {
  Dispatch,
  FunctionComponent,
  HTMLAttributes,
  SetStateAction,
} from "react";
import { Listbox } from "@headlessui/react";
import { SortType, SortTypeOptions } from "../../pages/dashboard";
import { BsCheck } from "react-icons/bs";

type TodoSortListboxProps = HTMLAttributes<HTMLDivElement> & {
  selectedSort: SortType;
  setSelectedSort: Dispatch<SetStateAction<"Date" | "Title">>;
};

const TodoSortListbox: FunctionComponent<TodoSortListboxProps> = (props) => {
  const { selectedSort, setSelectedSort, ...divProps } = props;

  return (
    <div {...divProps}>
      <Listbox value={selectedSort} onChange={setSelectedSort}>
        <Listbox.Button>Sort By {selectedSort}</Listbox.Button>
        <Listbox.Options>
          {SortTypeOptions.map((option, i) => (
            <Listbox.Option
              className="p-2 m-1 hover:bg-gray-900"
              key={i}
              value={option}
            >
              {({ selected }) => (
                <span>
                  <span className="inline">{option} </span>
                  <span className="inline">
                    {selected ? <BsCheck className="inline" /> : null}
                  </span>
                </span>
              )}
            </Listbox.Option>
          ))}
        </Listbox.Options>
      </Listbox>
    </div>
  );
};

export default TodoSortListbox;
