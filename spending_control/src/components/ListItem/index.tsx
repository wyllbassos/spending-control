import React, {useMemo} from 'react';
import {TouchableOpacityProps} from 'react-native';
import Icons from 'react-native-vector-icons/Feather';

import {useThemes} from '../../hooks';

import {Container, Text, ContainerIcon} from './styles';

interface ListItemProps extends TouchableOpacityProps {
  text?: string | string[];
  buttonTrash?: {
    onPress: () => void;
  };
  buttonEdit?: {
    onPress: () => void;
  };
}

const ListItem: React.FC<ListItemProps> = ({
  onPress,
  children,
  text,
  buttonEdit,
  buttonTrash,
  ...props
}) => {
  const {
    theme: {primaryColor, secundaryColor},
  } = useThemes();

  const textItem = useMemo(() => {
    if (text) {
      if (!Array.isArray(text)) {
        return text;
      }
      let retText = '';
      text.map((str, i) => {
        retText += str;
        if (i < text.length - 1) retText += '\n';
      });
      return retText;
    }
    return undefined;
  }, [text]);

  return (
    <Container
      disabled={!onPress}
      onPress={onPress}
      backgroundColor={secundaryColor}
      style={{elevation: 2}}
      {...props}>
      {textItem && <Text color={primaryColor}>{textItem}</Text>}

      {!!children && children}

      {!!buttonEdit && (
        <ContainerIcon onPress={buttonEdit.onPress}>
          <Icons name="edit" size={24} color={primaryColor} />
        </ContainerIcon>
      )}

      {!!buttonTrash && (
        <ContainerIcon onPress={buttonTrash.onPress}>
          <Icons name="trash-2" size={24} color={primaryColor} />
        </ContainerIcon>
      )}
    </Container>
  );
};

export default ListItem;
